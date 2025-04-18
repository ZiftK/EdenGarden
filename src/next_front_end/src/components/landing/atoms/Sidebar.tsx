import { BtnHref } from "../../../shared/components/atoms/Button";
import { Sidebar } from "@raul_yael/cleangui"

export function SidebarMenu({isOpen, close}: {isOpen: boolean, close: () => void}){

    return(
        
            <Sidebar  
              anchor="right"  
              $isOpen={isOpen} 
              onClose={close}
              $bg="#3D5C1A"
            >
                <BtnHref 
                  link="#" 
                  text="Nosotros"

                />
            </Sidebar>
      
    )
    
} 