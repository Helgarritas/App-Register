import { toast } from "sonner"

import { Button } from "../../../../components/ui"

export function Sonner() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
        })
      } 
    >
      Show Toast
    </Button>   
  )
}
