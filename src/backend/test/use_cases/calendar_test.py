import pytest
from backend.test.use_cases.calendar_params import get_working_days_params
from backend.edensg_server.use_cases.calendar_calc import get_working_days_on_sprint
from backend.edensg_server.domain.entities.project_calendar import Date, ProjectCalendar


# from utils import load_module_from_path, py_server_path

# use_cases_path = py_server_path.copy()
# use_cases_path.append("\\use_cases\\calendar.py")
# use_cases_path = "\\".join(use_cases_path)

# use_cases_module = load_module_from_path(use_cases_path)

@pytest.mark.parametrize("params, expected", get_working_days_params)
def test_get_working_days(params, expected):

    params = ProjectCalendar(**params)
    models: list[Date] = get_working_days_on_sprint(params)
    models: list[dict] = [x.model_dump() for x in models]
    assert models == expected
