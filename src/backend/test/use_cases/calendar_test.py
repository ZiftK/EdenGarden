import pytest
from backend.edensg_server.use_cases.calendar_calc import\
    get_working_days_on_sprint,\
    run_through_dates

from backend.edensg_server.domain.entities.project_calendar import Date, ProjectCalendar

from backend.test.use_cases.calendar_params import\
    get_working_days_params,\
    run_throught_dates_params


# @pytest.mark.parametrize("params, expected", get_working_days_params)
# def test_get_working_days(params, expected):

#     params = ProjectCalendar(**params)
#     models: list[Date] = get_working_days_on_sprint(params)
#     models: list[dict] = [x.model_dump() for x in models]
#     assert models == expected


@pytest.mark.parametrize("params, expected", run_throught_dates_params)
def test_run_throught_dates(params: dict, expected)-> None:
    assert run_through_dates(**params) == expected
