import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export function Toast({ message, isError }) {
  const notify = () => toast('Wow so easy!');

  return <>{message}</>;
}
