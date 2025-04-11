from backend.edensg_server.domain.entities.time_enums import EnumMonths, EnumDays
from backend.edensg_server.domain.entities.project_calendar import Date,\
    ScheduleTemplates,\
    DateTemplate,\
    DayTemplate,\
    ScheduleData,\
    Time,\
    DateSchedule,\
    ProjectCalendar

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
                        "day": EnumDays(5),
                        "schedule": {
                            "is_working_day": False,
                            "initial_time": None,
                            "final_time": None,
                            "location": None
                        }
                    },
                    {
                        "day": EnumDays(6),
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
run_through_dates_params = [
    # Caso base: Sin exclusiones, con diferencia de 1 día.
    (
        (
            {
                "initial_date": date(day=1, month=1, year=2_000),
                "final_date": date(day=10, month=1, year=2_000),
                "difference": timedelta(days=1),
                "exclude_dates": None,
                "exclude_days": None
            }
        ),
        [Date(day=d, month=EnumMonths(1), year=2_000) for d in range(1, 11)]
    ),

    # Exclusión de fechas específicas.
    (
        (
            {
                "initial_date": date(day=1, month=1, year=2_000),
                "final_date": date(day=10, month=1, year=2_000),
                "difference": timedelta(days=1),
                "exclude_dates": [
                    date(day=1, month=1, year=2_000),
                    date(day=10, month=1, year=2_000),
                    date(day=7, month=1, year=2_000)
                ],
                "exclude_days": None
            }
        ),
        [Date(day=d, month=EnumMonths(1), year=2_000) for d in [2, 3, 4, 5, 6, 8, 9]]
    ),

    # Nueva prueba: Diferencia de 2 días.
    (
        (
            {
                "initial_date": date(day=1, month=1, year=2_000),
                "final_date": date(day=10, month=1, year=2_000),
                "difference": timedelta(days=2),
                "exclude_dates": None,
                "exclude_days": None
            }
        ),
        [Date(day=d, month=EnumMonths(1), year=2_000) for d in [1, 3, 5, 7, 9]]
    ),

    # Nueva prueba: Exclusión de sábados y domingos.
    (
        (
            {
                "initial_date": date(day=1, month=1, year=2_000),
                "final_date": date(day=10, month=1, year=2_000),
                "difference": timedelta(days=1),
                "exclude_dates": None,
                "exclude_days": {5, 6}  # Sábado y domingo
            }
        ),
        [Date(day=d, month=EnumMonths(1), year=2_000) for d in [3, 4, 5, 6, 7, 10]]  # Solo días hábiles
    ),

    # Nueva prueba: Intervalo más largo con diferencia de 3 días.
    (
        (
            {
                "initial_date": date(day=1, month=1, year=2_000),
                "final_date": date(day=1, month=2, year=2_000),
                "difference": timedelta(days=3),
                "exclude_dates": None,
                "exclude_days": None
            }
        ),
        [Date(day=d.day, month=EnumMonths(d.month), year=d.year)
        for d in [date(2000, 1, 1) + timedelta(days=i) for i in range(0, 32, 3)]]
    ),

    # Nueva prueba: Fecha final antes de la inicial (debe devolver lista vacía).
    (
        (
            {
                "initial_date": date(day=10, month=1, year=2_000),
                "final_date": date(day=1, month=1, year=2_000),
                "difference": timedelta(days=1),
                "exclude_dates": None,
                "exclude_days": None
            }
        ),
        []
    ),

    # Nueva prueba: Mismo día inicial y final.
    (
        (
            {
                "initial_date": date(day=5, month=1, year=2_000),
                "final_date": date(day=5, month=1, year=2_000),
                "difference": timedelta(days=1),
                "exclude_dates": None,
                "exclude_days": None
            }
        ),
        [Date(day=5, month=EnumMonths(1), year=2_000)]
    ),

    # Nueva prueba: Mismo día inicial y final, pero excluido.
    (
        (
            {
                "initial_date": date(day=5, month=1, year=2_000),
                "final_date": date(day=5, month=1, year=2_000),
                "difference": timedelta(days=1),
                "exclude_dates": [date(day=5, month=1, year=2_000)],
                "exclude_days": None
            }
        ),
        []
    )
]


"""
Input signature
----------------
schedule_tempaltes: ScheduleTemplates

returns -> {
    "day_templates": list[DayTemplate],
    "date_templates": list[DateTemplate],
    "not_working_days": list[EnumDays]
    "not_working_dates": list[datetime.date]
}
"""
substract_not_working_dates_params = [
    (
        ScheduleTemplates(
            by_date=[
                DateTemplate(
                    date=Date(day=1, month=EnumMonths(1), year=2024),
                    schedule=ScheduleData(
                        is_working_day=True,
                        initial_time=Time(hours=7, minutes=0, seconds=0),
                        final_time=Time(hours=15, minutes=0, seconds=0),
                        location=None
                    )
                ),
                DateTemplate(
                    date=Date(day=2, month=EnumMonths(1), year=2024),
                    schedule=ScheduleData(
                        is_working_day=True,
                        initial_time=Time(hours=8, minutes=0, seconds=0),
                        final_time=Time(hours=13, minutes=0, seconds=0),
                        location=None
                    )
                )
            ],

            by_day=[
                DayTemplate(
                    day=EnumDays(5),
                    schedule=ScheduleData(
                        is_working_day=True,
                        initial_time=Time(hours=8, minutes=0, seconds=0),
                        final_time=Time(hours=12, minutes=30, seconds=0),
                        location=None
                    )
                ),
                DayTemplate(
                    day=EnumDays(6),
                    schedule=ScheduleData(
                        is_working_day=True,
                        initial_time=Time(hours=13, minutes=30, seconds=0),
                        final_time=Time(hours=19, minutes=30, seconds=0),
                        location=None
                    )
                )
            ],

            default=ScheduleData(
                is_working_day=True,
                initial_time=Time(hours=10, minutes=0, seconds=0),
                final_time=Time(hours=19, minutes=0, seconds=0),
                location=None
            )
        ),

        {
            "day_templates": set([
                DayTemplate(
                    day=EnumDays(5),
                    schedule=ScheduleData(
                        is_working_day=True,
                        initial_time=Time(hours=8, minutes=0, seconds=0),
                        final_time=Time(hours=12, minutes=30, seconds=0),
                        location=None
                    )
                ),
                DayTemplate(
                    day=EnumDays(6),
                    schedule=ScheduleData(
                        is_working_day=True,
                        initial_time=Time(hours=13, minutes=30, seconds=0),
                        final_time=Time(hours=19, minutes=30, seconds=0),
                        location=None
                    )
                )
            ]),
            "date_templates": set([
                DateTemplate(
                    date=Date(day=1, month=EnumMonths(1), year=2024),
                    schedule=ScheduleData(
                        is_working_day=True,
                        initial_time=Time(hours=7, minutes=0, seconds=0),
                        final_time=Time(hours=15, minutes=0, seconds=0),
                        location=None
                    )
                ),
                DateTemplate(
                    date=Date(day=2, month=EnumMonths(1), year=2024),
                    schedule=ScheduleData(
                        is_working_day=True,
                        initial_time=Time(hours=8, minutes=0, seconds=0),
                        final_time=Time(hours=13, minutes=0, seconds=0),
                        location=None
                    )
                )
            ]),
            "not_working_days": set([]),
            "not_working_dates": set([])
        }
    ),
    # Caso con un día no laborable
    (
        ScheduleTemplates(
            by_date=[],
            by_day=[
                DayTemplate(
                    day=EnumDays(1),  # Lunes
                    schedule=ScheduleData(
                        is_working_day=False,
                        initial_time=None,
                        final_time=None,
                        location=None
                    )
                )
            ],
            default=ScheduleData(
                is_working_day=True,
                initial_time=Time(hours=9, minutes=0, seconds=0),
                final_time=Time(hours=18, minutes=0, seconds=0),
                location=None
            )
        ),
        {
            "day_templates": set([]),
            "date_templates": set([]),
            "not_working_days": set([EnumDays(1)]),
            "not_working_dates": set([])
        }
    ),
    # Caso con una fecha específica no laborable
    (
        ScheduleTemplates(
            by_date=[
                DateTemplate(
                    date=Date(day=25, month=EnumMonths(12), year=2024),
                    schedule=ScheduleData(
                        is_working_day=False,
                        initial_time=None,
                        final_time=None,
                        location=None
                    )
                )
            ],
            by_day=[],
            default=ScheduleData(
                is_working_day=True,
                initial_time=Time(hours=9, minutes=0, seconds=0),
                final_time=Time(hours=17, minutes=0, seconds=0),
                location=None
            )
        ),
        {
            "day_templates": set([]),
            "date_templates": set([]),
            "not_working_days": set([]),
            "not_working_dates": set([
                date(day=25, month=12, year=2024)
            ])
        }
    ),
]



"""
Input signature
---------------
working_days: list[Date]
day_template: list[DayTemplate]
date_templates: list[DateTemplate]
default_template: ScheduleData

returns -> 
list[DateSchedule]

"""
apply_schedule_templates_params = [
    (# case 1
        (# args
            # working dates
            [
                Date(day=1, month=1, year=2024),
                Date(day=2, month=1, year=2024),
                Date(day=3, month=1, year=2024),
                Date(day=4, month=1, year=2024),
                Date(day=5, month=1, year=2024),
                Date(day=6, month=1, year=2024),
                Date(day=7, month=1, year=2024),
            ],
            [# day_templates
                DayTemplate(
                    day=EnumDays(6),
                    schedule=ScheduleData(
                        initial_time=Time(hours=7, minutes=0, seconds=0),
                        final_time=Time(hours=12, minutes=30, seconds=0),
                        is_working_day=True,
                        location=None
                    )
                ),
                DayTemplate(
                    day=EnumDays(5),
                    schedule=ScheduleData(
                        initial_time=Time(hours=7, minutes=0, seconds=0),
                        final_time=Time(hours=12, minutes=30, seconds=0),
                        is_working_day=True,
                        location=None
                    )
                ),
            ],
            [# date templates
                DateTemplate(
                    date=Date(day=5, month=1, year=2024),
                    schedule=ScheduleData(
                        is_working_day=True,
                        initial_time=Time(hours=7, minutes=30, seconds=0),
                        final_time=Time(hours=12, minutes=30, seconds=0),
                        location=None
                    )
                ),
            ],
            # default template
            ScheduleData(
                is_working_day=True,
                initial_time=Time(hours=7, minutes=0, seconds=0),
                final_time=Time(hours=16, minutes=0, seconds=0),
                location=None
            )
        ),
        [# return expected
            DateSchedule(
                date=Date(day=1, month=1, year=2024),
                schedule=ScheduleData(
                    is_working_day=True,
                    initial_time=Time(hours=7, minutes=0, seconds=0),
                    final_time=Time(hours=16, minutes=0, seconds=0),
                    location=None
                )
            ),
            DateSchedule(
                date=Date(day=2, month=1, year=2024),
                schedule=ScheduleData(
                    is_working_day=True,
                    initial_time=Time(hours=7, minutes=0, seconds=0),
                    final_time=Time(hours=16, minutes=0, seconds=0),
                    location=None
                )
            ),
            DateSchedule(
                date=Date(day=3, month=1, year=2024),
                schedule=ScheduleData(
                    is_working_day=True,
                    initial_time=Time(hours=7, minutes=0, seconds=0),
                    final_time=Time(hours=16, minutes=0, seconds=0),
                    location=None
                )
            ),
            DateSchedule(
                date=Date(day=4, month=1, year=2024),
                schedule=ScheduleData(
                    is_working_day=True,
                    initial_time=Time(hours=7, minutes=0, seconds=0),
                    final_time=Time(hours=16, minutes=0, seconds=0),
                    location=None
                )
            ),
            DateSchedule(
                date=Date(day=5, month=1, year=2024),
                schedule=ScheduleData(
                    is_working_day=True,
                    initial_time=Time(hours=7, minutes=0, seconds=0),
                    final_time=Time(hours=16, minutes=0, seconds=0),
                    location=None
                )
            ),
            DateSchedule(
                date=Date(day=6, month=1, year=2024),
                schedule=ScheduleData(
                    initial_time=Time(hours=7, minutes=0, seconds=0),
                    final_time=Time(hours=12, minutes=30, seconds=0),
                    is_working_day=True,
                    location=None
                )
            ),
            DateSchedule(
                date=Date(day=7, month=1, year=2024),
                schedule=ScheduleData(
                    initial_time=Time(hours=7, minutes=0, seconds=0),
                    final_time=Time(hours=12, minutes=30, seconds=0),
                    is_working_day=True,
                    location=None
                )
            ),
        ]
    )
]


"""
Input signature
---------------

project_calendar: ProjectCalendar

returns -> list[DateSchedule]
"""
get_working_days_on_sprint_params = [
    (#  case
        ProjectCalendar(
            initial_date=Date(day=1, month=EnumMonths(12), year=2024),
            final_date=Date(day=1, month=EnumMonths(12), year=2024),
            schedule_templates=ScheduleTemplates(
                default=ScheduleData(
                    is_working_day=True,
                    initial_time=Time(hours=8, minutes=0, seconds=0),
                    final_time=Time(hours=16, minutes=0, seconds=0),
                    location=None
                ),
                by_date=None,
                by_day=[
                    DayTemplate(
                        day=EnumDays(5),
                        schedule=ScheduleData(
                            is_working_day=False,
                            initial_time=None,
                            final_time=None,
                            location=None
                        ),
                    )
                ]
            )
        )
    )
]