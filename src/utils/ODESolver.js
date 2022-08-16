export const runge_kutta_4 = (func, time, current_state, delta_time = 0.01) => {
  const f1 = func(time                 , current_state);
  const f2 = func(time + delta_time / 2, current_state.add(f1.mul(delta_time / 2)));
  const f3 = func(time + delta_time / 2, current_state.add(f2.mul(delta_time / 2)));
  const f4 = func(time + delta_time    , current_state.add(f3.mul(delta_time)));

  const next_state = f1.add(f2.mul(2)).add(f3.mul(2)).add(f4).mul(delta_time/4).add(current_state);

  return next_state;
}

export const euler_medthod =  (func, time, current_state, delta_time = 0.01) => {
   const next_state = func(time, current_state).mul(delta_time).add(current_state)

   return next_state
}
