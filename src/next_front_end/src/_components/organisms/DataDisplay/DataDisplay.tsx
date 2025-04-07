"use client"

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
                        variant='h2'
                        style={{
                            color: "var(--white-peristance-color)",
                            fontSize: 'var(--font-xl)',
                            fontFamily:  "'Montserrat', sans-serif",
                            fontWeight: 'normal',

                        }}
                    >
                        570
                    </Typography>

                    <Typography                              
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
                        >
                        Proyectos residenciales
                        </Typography>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: '5px',
                        alignItems:"center"
                    }}
                    >
                    
                    <Typography                         
                        variant='h2'
                        style={{
                            color: "var(--white-peristance-color)",
                            fontSize: 'var(--font-xl)',
                            fontFamily:  "'Montserrat', sans-serif",
                            fontWeight: 'normal',

                        }}
                        >
                        20
                    </Typography>

                    <Typography                                        
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
                        > 
                        Proyectos residenciales    
                    </Typography>
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
                        variant='h2'
                        style={{
                            color: "var(--white-peristance-color)",
                            fontSize: 'var(--font-xl)',
                            fontFamily:  "'Montserrat', sans-serif",
                            fontWeight: 'normal',

                        }}
                        > 964</Typography>

                    <Typography                                         
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
                        > 
                            Proyectos residenciales
                        </Typography>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: '5px',
                        alignItems:"center"
                    }}
                    >
                    
                    <Typography                 
                        variant='h2'
                        style={{
                            color: "var(--white-peristance-color)",
                            fontSize: 'var(--font-xl)',
                            fontFamily:  "'Montserrat', sans-serif",
                            fontWeight: 'normal',
                        }}
                    >
                        63
                    </Typography>

                    <Typography                                          
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
                    > 
                        Proyectos residenciales
                    </Typography>
                </div>
            </Box>
    )
}