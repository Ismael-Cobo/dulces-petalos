import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';
import styles from './badge.module.css';

test('renders children', () => {
    render(<Badge>Nuevo</Badge>);
    expect(screen.getByText('Nuevo')).toBeInTheDocument();
});

test('renderiza como un span', () => {
    render(<Badge>Nuevo</Badge>);
    expect(screen.getByText('Nuevo').tagName).toBe('SPAN');
});

test('acepta variant="success"', () => {
    render(<Badge variant="success">Disponible</Badge>);
    expect(screen.getByText('Disponible')).toBeInTheDocument();
});

test('acepta variant="default" (por defecto)', () => {
    render(<Badge>Sin stock</Badge>);
    expect(screen.getByText('Sin stock')).toBeInTheDocument();
});

describe('variant', () => {
    test('aplica la clase default cuando no se pasa variant', () => {
        render(<Badge>Texto</Badge>);
        expect(screen.getByText('Texto')).toHaveClass(styles.default);
    });

    test('aplica la clase default cuando variant="default"', () => {
        render(<Badge variant="default">Texto</Badge>);
        expect(screen.getByText('Texto')).toHaveClass(styles.default);
    });

    test('aplica la clase success cuando variant="success"', () => {
        render(<Badge variant="success">Disponible</Badge>);
        expect(screen.getByText('Disponible')).toHaveClass(styles.success);
    });

    test('no aplica la clase success cuando variant es default', () => {
        render(<Badge variant="default">Texto</Badge>);
        expect(screen.getByText('Texto')).not.toHaveClass(styles.success);
    });
});
