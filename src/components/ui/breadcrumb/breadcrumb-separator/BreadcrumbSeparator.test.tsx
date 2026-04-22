import { render } from '@testing-library/react';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';
import styles from './breadcrumb-separator.module.css';

test('renderiza con aria-hidden="true"', () => {
    const { container } = render(<BreadcrumbSeparator />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
});

test('aplica la clase separator', () => {
    const { container } = render(<BreadcrumbSeparator />);
    expect(container.querySelector('[aria-hidden="true"]')).toHaveClass(styles.separator);
});

test('renderiza el carácter separador', () => {
    const { container } = render(<BreadcrumbSeparator />);
    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent('›');
});
