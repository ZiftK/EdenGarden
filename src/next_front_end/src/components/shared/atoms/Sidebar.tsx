'use client'

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
              <div className="flex w-full flex-col gap-4 pt-6 pl'2 ">
                {
                  menuItems.map((item,index) => {
                    return(
                      <div key={index} className="place-self-start w-full "> 
                        <BtnHref 
                            $Icon={item.icon} 
                            className="flex gap-2 justify-start p-2"
                            $IconStyle="place-self-center"
                            link={item.link}
                            text={item.label}    
                            weight={500}    
                            style={{color: "var(--white-peristance-color)"}}                    
                            />
                      </div>
                    )
                  })
                }

              </div>
              <BtnHref 
                  link="/login" 
                  text="Cerrar Sesion"
                  weight={500}    
                  className="mt-auto mb-6"
                  style={{color: "var(--white-peristance-color)"}}   
                  />
            </Sidebar>
      
    )
    
} 