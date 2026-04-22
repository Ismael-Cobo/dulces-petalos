import { render, screen } from '@testing-library/react';
import { BreadcrumbList } from './BreadcrumbList';
import styles from './breadcrumb-list.module.css';

test('renderiza una lista ordenada', () => {
    render(<BreadcrumbList><li>item</li></BreadcrumbList>);
    expect(screen.getByRole('list')).toBeInTheDocument();
});

test('renderiza los hijos', () => {
    render(<BreadcrumbList><li>inicio</li></BreadcrumbList>);
    expect(screen.getByText('inicio')).toBeInTheDocument();
});

test('aplica la clase list', () => {
    render(<BreadcrumbList><li>item</li></BreadcrumbList>);
    expect(screen.getByRole('list')).toHaveClass(styles.list);
});
