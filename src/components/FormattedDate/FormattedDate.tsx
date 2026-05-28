interface FormattedDateProps {
  dateString: string;
}

export function FormattedDate({ dateString }: FormattedDateProps) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return <time dateTime={dateString}>{formattedDate}</time>;
}
