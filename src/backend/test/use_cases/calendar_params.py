from backend.edensg_server.domain.entities.time_enums import EnumMonths, EnumDays
from backend.edensg_server.domain.entities.project_calendar import Date

from datetime import date, timedelta


get_working_days_params = [
    (
        #* CASO 1: DIAS CONSECUTIVOS
        {
        "initial_date": 
            {"day": 1, "month": EnumMonths(1), "year": 2_000},

        "final_date": 
            {"day": 30, "month": EnumMonths(3), "year": 2_000},
        
        "schedule_templates": {
            "by_date": None,
            "by_day": None
        },
        
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

        "schedule_templates": {
            "by_date": None,
            "by_day": None
        },
        
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

            "schedule_templates": {
                "by_date": None,
                "by_day": None
            },
            
            "current_sprint": {
                "initial_date": {"day": 15, "month": EnumMonths(4), "year": 2023},
                "final_date": {"day": 15, "month": EnumMonths(4), "year": 2023},
            }
        },
        [{"day": 15, "month": EnumMonths(4), "year": 2023}]
    ),
    
    #* CASO 4: PERIODO CON DÍAS NO LABORABLES
    (
        {
            "initial_date": {"day": 10, "month": EnumMonths(5), "year": 2023},
            "final_date": {"day": 20, "month": EnumMonths(5), "year": 2023},
            
            #? TEMPLATES
            "schedule_templates": {

                "by_date": [
                    #? SIN LABORAR LOS DÍAS 11 Y 15
                    {
                        "date": {
                            "day": 11,
                            "month": EnumMonths(5),
                            "year": 2023
                        },
                        "schedule": {
                            "is_working_day": False,
                            "initial_time": None,
                            "final_time": None,
                            "location": None
                        }
                    },
                    {
                        "date": {
                            "day": 15,
                            "month": EnumMonths(5),
                            "year": 2023
                        },
                        "schedule": {
                            "is_working_day": False,
                            "initial_time": None,
                            "final_time": None,
                            "location": None
                        }
                    },
                ],
                
                "by_day": [
                    #? SIN LABORAR DOMINGOS NI SÁBADOS
                    {
                        "day": EnumDays(6),
                        "schedule": {
                            "is_working_day": False,
                            "initial_time": None,
                            "final_time": None,
                            "location": None
                        }
                    },
                    {
                        "day": EnumDays(7),
                        "schedule": {
                            "is_working_day": False,
                            "initial_time": None,
                            "final_time": None,
                            "location": None
                        }
                    }
                ]
            },

            "current_sprint": {
                "initial_date": {"day": 10, "month": EnumMonths(5), "year": 2023},
                "final_date": {"day": 20, "month": EnumMonths(5), "year": 2023},
            }
        },
        [
            {"day": 10, "month": EnumMonths(5), "year": 2023}, # mie
            {"day": 12, "month": EnumMonths(5), "year": 2023}, # vie
            {"day": 16, "month": EnumMonths(5), "year": 2023}, # mart
            {"day": 17, "month": EnumMonths(5), "year": 2023}, # mier
            {"day": 18, "month": EnumMonths(5), "year": 2023}, # jue
            {"day": 19, "month": EnumMonths(5), "year": 2023}, # vie
        ]
    ),
    
    #* CASO 5: PERIODO QUE CRUZA DE UN AÑO A OTRO
    (
        {
            "initial_date": {"day": 29, "month": EnumMonths(12), "year": 2023},
            "final_date": {"day": 3, "month": EnumMonths(1), "year": 2024},
            
            "schedule_templates": {
                "by_date": None,
                "by_day": None
            },

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


"""
input signature
---------------
initial_date: datetime.date
final_date: datetime.date
difference: datetime.timedelta
exclude_dates: set[datetime.date] = None
exclude_days: set[EnumDays] = None

returns -> list[Date]
"""
run_throught_dates_params = [
    (
        (
            {
                "initial_date": date(day=1, month=1, year=2_000),
                "final_date": date(day=10, month=1, year=2_000),
                "difference": timedelta(days=1),
                "exclude_dates": None,
                "exclude_days": None
            }
        )
        ,
        [
            Date(day=1, month=EnumMonths(1), year=2_000),
            Date(day=2, month=EnumMonths(1), year=2_000),
            Date(day=3, month=EnumMonths(1), year=2_000),
            Date(day=4, month=EnumMonths(1), year=2_000),
            Date(day=5, month=EnumMonths(1), year=2_000),
            Date(day=6, month=EnumMonths(1), year=2_000),
            Date(day=7, month=EnumMonths(1), year=2_000),
            Date(day=8, month=EnumMonths(1), year=2_000),
            Date(day=9, month=EnumMonths(1), year=2_000),
            Date(day=10, month=EnumMonths(1), year=2_000)
        ]
    ),
    (
        (
            {
                "initial_date": date(day=1, month=1, year=2_000), # initial date,
                "final_date": date(day=10, month=1, year=2_000), # final date,
                "difference": timedelta(days=1), # difference
                "exclude_dates": [
                    date(day=1, month=1, year=2_000),
                    date(day=10, month=1, year=2_000),
                    date(day=7, month=1, year=2_000)
                ],
                "exclude_days": None
                
            }
        ),
        [
            Date(day=2, month=EnumMonths(1), year=2_000),
            Date(day=3, month=EnumMonths(1), year=2_000),
            Date(day=4, month=EnumMonths(1), year=2_000),
            Date(day=5, month=EnumMonths(1), year=2_000),
            Date(day=6, month=EnumMonths(1), year=2_000),
            Date(day=8, month=EnumMonths(1), year=2_000),
            Date(day=9, month=EnumMonths(1), year=2_000),
        ]
    )
]