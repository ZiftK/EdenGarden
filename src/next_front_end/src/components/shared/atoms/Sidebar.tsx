import { JSX } from "react"
import { BtnHref } from "../../../shared/components/atoms/Button";
import { Sidebar } from "@raul_yael/cleangui"


type menuProps = {
    menuItems: {label: string, link: string, icon: JSX.Element}[],
    isOpen: boolean,
    close: () => void
}

export function SidebarMenu({ menuItems, isOpen, close }: menuProps) {

    return(
        
            <Sidebar  
              anchor="right"  
              $isOpen={isOpen} 
              onClose={close}
              $bg="#3D5C1A"            
            >
                {
                  menuItems.map((item,index) => {
                    return(
                      <div key={index}> 
                        <BtnHref 
                            icon={item.icon} 
                            className="flex gap-2 items-center p-2 text-white"
                            link={item.link}
                            text={item.label}
                            />
                      </div>
                    )
                  })
                }
            </Sidebar>
      
    )
    
} 