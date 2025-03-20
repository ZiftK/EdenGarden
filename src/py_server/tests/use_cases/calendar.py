import pytest
from calendar_params import get_working_days_params

@pytest.mark.parametrize(
        "wk_d_params, wk_d",
        get_working_days_params
)
def test_get_working_days(wk_d_params, wk_d):
    
    pass