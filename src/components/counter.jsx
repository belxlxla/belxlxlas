// Counter.jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../store/features/counterSlice';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>
        Increase
      </button>
    </div>
  );
}

export default Counter;