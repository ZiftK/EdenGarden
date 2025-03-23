from backend.edensg_server.domain.entities.time_enums import EnumMonths

get_working_days_params = [
    (
        #* CASO 1: DIAS CONSECUTIVOS
        {
        "initial_date": 
            {"day": 1, "month": EnumMonths(1), "year": 2_000},

        "final_date": 
            {"day": 30, "month": EnumMonths(3), "year": 2_000},
        
        "not_working_days": None,
        
        "current_sprint":
            {
                "initial_date": {"day": 1, "month": EnumMonths(1), "year": 2_000},
                
                "final_date": {"day": 7, "month": EnumMonths(1), "year": 2_000},
            }
        },

        [
            {"day": 1, "month": EnumMonths(1), "year": 2_000},
            {"day": 2, "month": EnumMonths(1), "year": 2_000},
            {"day": 3, "month": EnumMonths(1), "year": 2_000},
            {"day": 4, "month": EnumMonths(1), "year": 2_000},
            {"day": 5, "month": EnumMonths(1), "year": 2_000},
            {"day": 6, "month": EnumMonths(1), "year": 2_000},
            {"day": 7, "month": EnumMonths(1), "year": 2_000},
        ]
    ),
    (
        #* CASO 2: CRUZE DE MES
        {
        "initial_date": 
            {"day": 1, "month": EnumMonths(1), "year": 2_000},

        "final_date": 
            {"day": 3, "month": EnumMonths(3), "year": 2_000},

        "not_working_days": None,
        
        "current_sprint":
            {
                "initial_date": {"day": 30, "month": EnumMonths(1), "year": 2_000},
                
                "final_date": {"day": 3, "month": EnumMonths(2), "year": 2_000},
            }
        },

        [
            {"day": 30, "month": EnumMonths(1), "year": 2_000},
            {"day": 31, "month": EnumMonths(1), "year": 2_000},
            {"day": 1, "month": EnumMonths(2), "year": 2_000},
            {"day": 2, "month": EnumMonths(2), "year": 2_000},
            {"day": 3, "month": EnumMonths(2), "year": 2_000}
        ]
    ),

    #* CASO 3: PERIODO DE UN SOLO DÍA
    (
        {
            "initial_date": {"day": 15, "month": EnumMonths(4), "year": 2023},
            "final_date": {"day": 15, "month": EnumMonths(4), "year": 2023},
            "not_working_days": None,
            "current_sprint": {
                "initial_date": {"day": 15, "month": EnumMonths(4), "year": 2023},
                "final_date": {"day": 15, "month": EnumMonths(4), "year": 2023},
            }
        },
        [{"day": 15, "month": EnumMonths(4), "year": 2023}]
    ),
    
    #* CASO 3: PERIODO CON DÍAS NO LABORABLES
    (
        {
            "initial_date": {"day": 10, "month": EnumMonths(5), "year": 2023},
            "final_date": {"day": 20, "month": EnumMonths(5), "year": 2023},
            "not_working_days": [
                {"day": 13, "month": EnumMonths(5), "year": 2023},
                {"day": 14, "month": EnumMonths(5), "year": 2023}
            ],
            "current_sprint": {
                "initial_date": {"day": 10, "month": EnumMonths(5), "year": 2023},
                "final_date": {"day": 20, "month": EnumMonths(5), "year": 2023},
            }
        },
        [
            {"day": 10, "month": EnumMonths(5), "year": 2023},
            {"day": 11, "month": EnumMonths(5), "year": 2023},
            {"day": 12, "month": EnumMonths(5), "year": 2023},
            {"day": 15, "month": EnumMonths(5), "year": 2023},
            {"day": 16, "month": EnumMonths(5), "year": 2023},
            {"day": 17, "month": EnumMonths(5), "year": 2023},
            {"day": 18, "month": EnumMonths(5), "year": 2023},
            {"day": 19, "month": EnumMonths(5), "year": 2023},
            {"day": 20, "month": EnumMonths(5), "year": 2023}
        ]
    ),
    
    #* CASO 4: PERIODO QUE CRUZA DE UN AÑO A OTRO
    (
        {
            "initial_date": {"day": 29, "month": EnumMonths(12), "year": 2023},
            "final_date": {"day": 3, "month": EnumMonths(1), "year": 2024},
            "not_working_days": None,
            "current_sprint": {
                "initial_date": {"day": 29, "month": EnumMonths(12), "year": 2023},
                "final_date": {"day": 3, "month": EnumMonths(1), "year": 2024},
            }
        },
        [
            {"day": 29, "month": EnumMonths(12), "year": 2023},
            {"day": 30, "month": EnumMonths(12), "year": 2023},
            {"day": 31, "month": EnumMonths(12), "year": 2023},
            {"day": 1, "month": EnumMonths(1), "year": 2024},
            {"day": 2, "month": EnumMonths(1), "year": 2024},
            {"day": 3, "month": EnumMonths(1), "year": 2024}
        ]
    )
]
