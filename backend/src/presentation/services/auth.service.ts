import { UserModel } from '../../data/mongo/model/user.model';
import { CustomError } from "../../domain/error/custom.error";
import { bcryptAdapter } from '../../config/bcrypt.adapter';
import { JwtAdapter } from '../../config/jwt.adapter';
import { envs } from '../../config/envs';
import { EmailService } from './email.service';
// Dto
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from '../../domain/entities/user.entity';
import { isErrored } from 'stream';

export class AuthService {
    constructor(
        private readonly emailService: EmailService,
    ) { }

    public async loginUser(loginUserDto: LoginUserDto) {
        const user = await UserModel.findOne({
            email: loginUserDto.email
        })
        if (!user) throw CustomError.internalServer('Email no found');

        try {
            const validPassword = bcryptAdapter.compare(
                loginUserDto.password,
                user.password
            )
            if (!validPassword) throw CustomError.internalServer('Password is not valid');

            const token = await JwtAdapter.generateToken({ id: user.id });
            if ( !token ) throw CustomError.internalServer('Error while creating JWT');

            const { password, ...userEntity } = UserEntity.fromObject(user)

            console.log({
                user: userEntity,
                token: token
            });
            
            return {
                user: userEntity,
                token: token
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    public async registerUser(registerUserDto: RegisterUserDto) {
        const existUser = await UserModel.findOne({ email: registerUserDto.email })
        if (existUser) throw CustomError.badRequest('Email alrady exist');
        console.log(registerUserDto);

        try {
            const user = new UserModel(registerUserDto)
            console.log(user);
            user.password = bcryptAdapter.hash(registerUserDto.password);
            await user.save();
            
            await this.sendEmailValidationLink( user.email, user.user );
            
            const token = await JwtAdapter.generateToken({ id: user.id });
            if ( !token ) throw CustomError.internalServer('Error while creating JWT');
            
            console.log(user);
            const { password, ...userEntity } = UserEntity.fromObject(user)

            return {
                user: userEntity,
                token: token 
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    private sendEmailValidationLink = async (email: string, user:string) => {

        const token = await JwtAdapter.generateToken({ email });
        if (!token) throw CustomError.internalServer('Error getting token');

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
        const html = `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <p style="font-size: 18px; font-weight: bold;">Estimado/a ${user}:</p>
              <p style="font-size: 16px; margin-bottom: 20px;">
                Para completar el proceso de verificación de su cuenta y garantizar la seguridad de la información, le solicitamos que confirme su dirección de correo electrónico.
              </p>
              <p style="font-size: 16px; margin-bottom: 20px;">
                Por favor, haga clic para verificar su dirección de correo electrónico:
              </p>
              <a href="${link}" style="display: inline-block; padding: 10px 20px; width: 200px; text-align: center; color: black; font-size: 16px; font-weight: 500; background-color: #fbbf24; border-radius: 8px; text-decoration: none;">Verificar</a> 
              <p style="font-size: 16px; margin-top: 20px;">
                Si no solicitó esta verificación, por favor ignore este mensaje.
              </p>
              <p style="font-size: 16px; margin-bottom: 20px;">
                Agradecemos su colaboración. Para cualquier consulta o asistencia adicional, no dude en contactarnos.
              </p>
              <p style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">Atentamente,</p>
              <p style="font-size: 16px;">Contmin</p>
            </div>
        `;

        const options = {
            to: email, 
            subject: 'Verificación de Correo Electrónico',
            htmlBody: html,
        }

        const isSent = await this.emailService.sendEmail(options);
        if (!isSent) throw CustomError.internalServer('Error sending email');

        return true;
    }

    public validateEmail = async (token: string) => {
        const payload = await JwtAdapter.validateToken(token);
        if (!payload) throw CustomError.unAuthorized('Invalid token');

        const { email } = payload as { email: string };
        if (!email) throw CustomError.internalServer('Email not in token');

        const user = await UserModel.findOne({ email });
        if (!user) throw CustomError.internalServer('Email not exists');

        user.emailValidated = true;
        await user.save();

        return true;
    }
}