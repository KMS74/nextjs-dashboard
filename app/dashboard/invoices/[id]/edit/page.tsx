import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

// page component has access to the params object which contains the id
export default async function Page(props: Props) {
  const params = await props.params;
  const id = params.id;

  // Fetch the invoice and customers data in parallel
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  // If the invoice is not found, redirect to 404
  if (!invoice) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
