'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../button';

type Props = {
  buttonText: string;
  loadingText: string;
};

const SubmitButton = ({ buttonText, loadingText }: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? loadingText : buttonText}
    </Button>
  );
};

export default SubmitButton;
