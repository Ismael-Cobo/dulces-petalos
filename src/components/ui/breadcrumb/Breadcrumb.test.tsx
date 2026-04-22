import { render, screen } from '@testing-library/react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from './Breadcrumb';
import styles from './breadcrumb.module.css';

test('renderiza un nav con aria-label="breadcrumb"', () => {
    render(<Breadcrumb><span>contenido</span></Breadcrumb>);
    expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument();
});

test('aplica la clase breadcrumb al nav', () => {
    render(<Breadcrumb><span>contenido</span></Breadcrumb>);
    expect(screen.getByRole('navigation')).toHaveClass(styles.breadcrumb);
});

test('composición completa renderiza correctamente', () => {
    render(
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink render={<a href="/">Inicio</a>} />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Productos</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );

    expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Inicio' })).toBeInTheDocument();
    expect(screen.getByText('Productos')).toHaveAttribute('aria-current', 'page');
});
