import { render, screen } from '@testing-library/react';
import { BreadcrumbItem } from './BreadcrumbItem';
import styles from './breadcrumb-item.module.css';

test('renderiza un listitem', () => {
    render(<ul><BreadcrumbItem>inicio</BreadcrumbItem></ul>);
    expect(screen.getByRole('listitem')).toBeInTheDocument();
});

test('renderiza los hijos', () => {
    render(<ul><BreadcrumbItem>inicio</BreadcrumbItem></ul>);
    expect(screen.getByText('inicio')).toBeInTheDocument();
});

test('aplica la clase item', () => {
    render(<ul><BreadcrumbItem>inicio</BreadcrumbItem></ul>);
    expect(screen.getByRole('listitem')).toHaveClass(styles.item);
});
