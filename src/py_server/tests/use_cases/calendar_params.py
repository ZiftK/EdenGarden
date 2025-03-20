

get_working_days_params = [
    (
        {
        "initial_date": 
            {"day": 1, "month": 1, "year": 2_000},

        "final_date": 
            {"day": 30, "month": 3, "year": 2_000},
        
        "current_sprint":
            {
                "initial_date": {"day": 1, "month": 1, "year": 2_000},
                
                "final_date": {"day": 7, "month": 1, "year": 2_000},
            }
        },
        [
            {"day": 1, "month": 1, "year": 2_000},
            {"day": 2, "month": 1, "year": 2_000},
            {"day": 3, "month": 1, "year": 2_000},
            {"day": 4, "month": 1, "year": 2_000},
            {"day": 5, "month": 1, "year": 2_000},
            {"day": 6, "month": 1, "year": 2_000},
            {"day": 7, "month": 1, "year": 2_000},
        ]
    )
]
