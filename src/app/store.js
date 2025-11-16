import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import petsReducer from '../features/pets/petsSlice';
import vaccinationsReducer from '../features/vaccinations/vaccinationsSlice';
import dewormingsReducer from '../features/dewormings/dewormingsSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import petDetailsReducer from '../features/pets/petDetailsSlice';
import { RESET_ALL_STATE } from '../features/resetAll';  // Your reset action

const appReducer = combineReducers({
  auth: authReducer,
  pets: petsReducer,
  vaccinations: vaccinationsReducer,
  dewormings: dewormingsReducer,
  dashboard: dashboardReducer,
  petDetails: petDetailsReducer,
});

// Root reducer wrapping reset logic
const rootReducer = (state, action) => {
  if (action.type === RESET_ALL_STATE) {
    state = undefined; // this resets all slices to initialState
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
