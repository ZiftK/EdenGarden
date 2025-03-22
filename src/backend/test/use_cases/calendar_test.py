import pytest
from src.backend.test.use_cases.calendar_params import get_working_days_params
from backend.edensg_server.use_cases.calendar import get_working_days


# from utils import load_module_from_path, py_server_path

# use_cases_path = py_server_path.copy()
# use_cases_path.append("\\use_cases\\calendar.py")
# use_cases_path = "\\".join(use_cases_path)

# use_cases_module = load_module_from_path(use_cases_path)

@pytest.mark.parametrize(
    "params",
    get_working_days_params
)
def test_get_working_days(params):
    for _params, expected in params:
        assert get_working_days(_params) == expected
