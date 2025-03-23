from backend.edensg_server.domain.entities.time_enums import EnumMonths

get_working_days_params = [
    (
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
]
