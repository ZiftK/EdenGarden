import { CSSProperties } from "react";
import { BtnHref } from "../../shared/atoms/Button";

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

interface SidebarProps {
    anchor?: "top" | "bottom" | "left" | "right"; 
    $isOpen?: boolean; 
    className?: string; 
    id?: string; 
    styles?: CSSProperties; 
    $bg?: string; 
    children?: React.ReactNode; 
    onClose?: () => void; 
  }
  

  import styled,{css} from "styled-components";


const SidebarWrapper = styled.div<SidebarProps>`
  position: fixed;
  z-index: 11;
  transition: transform 0.3s;
  overflow-y: auto;
  display: flex;
  justify-content: start;
  padding: 20px;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  ${({ anchor, $isOpen }) => ({
    left: css`
      top: 0;
      left: 0;
      height: 100%;
      width: 200px;
      transform: translateX(${$isOpen ? '0' : '-100%'});
    `,
    right: css`
      top: 0;
      right: 0;
      height: 100%;
      width: 200px;
      transform: translateX(${$isOpen ? '0' : '100%'});
    `,
    top: css`
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      transform: translateY(${$isOpen ? '0' : '-100%'});
    `,
    bottom: css`
      bottom: 0;
      left: 0;
      width: 100%;
      height: auto;
      transform: translateY(${$isOpen ? '0' : '100%'});
    `
  })[anchor!]}

  background-color: ${({ $bg }) => $bg || 'white'};

`;

const Overlay = styled.div<{$isOpen: boolean}>`
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    backdrop-filter: blur(4px);
    
    z-index:10; 
    opacity: ${({$isOpen}) => $isOpen ? 1 : 0};
    visibility: ${({$isOpen}) => $isOpen ? 'visible' : 'hidden'};
    transition: opacity 0.3s, visibility 0.3s;
`;

function Sidebar({
  ...rest
}:SidebarProps){
  return(
    <>
      <Overlay $isOpen={rest.$isOpen || false} onClick={rest.onClose} />
      <SidebarWrapper {...rest}/>
    </>
  )
}