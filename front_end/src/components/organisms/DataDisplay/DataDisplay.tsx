import { Box, Typography } from "@raul_yael/cleangui";
import "./DataDisplay.css"

export function DataShow(){
    return(
            <Box
                type="section"
                id="DataShow_Box"
            >
                <div
                    style={{
                        display: "flex",
                        gap: '5px',
                        alignItems:"center",
                        width:'47%'
                    }}
                    >
                    
                    <Typography 
                        children='570'
                        variant='h2'
                        style={{
                            color: "var(--white-peristance-color)",
                            fontSize: 'var(--font-xl)',
                            fontFamily:  "'Montserrat', sans-serif",
                            fontWeight: 'normal',

                        }}
                        />

                    <Typography 
                        children='Proyectos residenciales'                        
                        variant='p'
                        style={{
                            color: "var(--white-peristance-color)",
                            fontSize: 'var(--font-xs)',
                            fontFamily:  "'Montserrat', sans-serif",
                            fontWeight: 'lighter',          
                            width:'100px',
                            lineHeight: "12px",
                            letterSpacing:'1px'
                        }}
                        />
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: '5px',
                        alignItems:"center"
                    }}
                    >
                    
                    <Typography 
                        children='20'
                        variant='h2'
                        style={{
                            color: "var(--white-peristance-color)",
                            fontSize: 'var(--font-xl)',
                            fontFamily:  "'Montserrat', sans-serif",
                            fontWeight: 'normal',

                        }}
                        />

                    <Typography 
                        children='Proyectos residenciales'                        
                        variant='p'
                        style={{
                            color: "var(--white-peristance-color)",
                            fontSize: 'var(--font-xs)',
                            fontFamily:  "'Montserrat', sans-serif",
                            fontWeight: 'lighter',          
                            width:'100px',
                            lineHeight: "12px",
                            letterSpacing:'1px'
                        }}
                        />
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: '5px',
                        alignItems:"center",
                        width: "47%"
                    }}
                    >
                    
                    <Typography 
                        children='964'
                        variant='h2'
                        style={{
                            color: "var(--white-peristance-color)",
                            fontSize: 'var(--font-xl)',
                            fontFamily:  "'Montserrat', sans-serif",
                            fontWeight: 'normal',

                        }}
                        />

                    <Typography 
                        children='Proyectos residenciales'                        
                        variant='p'
                        style={{
                            color: "var(--white-peristance-color)",
                            fontSize: 'var(--font-xs)',
                            fontFamily:  "'Montserrat', sans-serif",
                            fontWeight: 'lighter',          
                            width:'100px',
                            lineHeight: "12px",
                            letterSpacing:'1px'
                        }}
                        />
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: '5px',
                        alignItems:"center"
                    }}
                    >
                    
                    <Typography 
                        children='63'
                        variant='h2'
                        style={{
                            color: "var(--white-peristance-color)",
                            fontSize: 'var(--font-xl)',
                            fontFamily:  "'Montserrat', sans-serif",
                            fontWeight: 'normal',

                        }}
                        />

                    <Typography 
                        children='Proyectos residenciales'                        
                        variant='p'
                        style={{
                            color: "var(--white-peristance-color)",
                            fontSize: 'var(--font-xs)',
                            fontFamily:  "'Montserrat', sans-serif",
                            fontWeight: 'lighter',          
                            width:'100px',
                            lineHeight: "12px",
                            letterSpacing:'1px'
                        }}
                        />
                </div>
            </Box>
    )
}