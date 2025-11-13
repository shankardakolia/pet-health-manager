import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import petsReducer from '../features/pets/petsSlice';
import vaccinationsReducer from '../features/vaccinations/vaccinationsSlice';
import dewormingsReducer from '../features/dewormings/dewormingsSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petsReducer,
    vaccinations: vaccinationsReducer,
    dewormings: dewormingsReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
