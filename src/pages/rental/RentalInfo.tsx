import { useParams } from 'react-router-dom';

function RentalInfo() {
  const { id } = useParams<{ id: string }>();
  return <div>{id}</div>;
}

export default RentalInfo;
