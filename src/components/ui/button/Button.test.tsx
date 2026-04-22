import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Button } from './Button';
import styles from './button.module.css';

test('renders children', () => {
    render(<Button>Comprar</Button>);
    expect(screen.getByRole('button', { name: 'Comprar' })).toBeInTheDocument();
});

test('tiene type="button" por defecto', () => {
    render(<Button>Comprar</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
});

test('acepta type="submit"', () => {
    render(<Button type="submit">Enviar</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
});

test('llama a onClick cuando se hace click', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Comprar</Button>);
    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
});

test('no llama a onClick cuando está disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick} disabled>Comprar</Button>);
    await user.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
});

test('aplica className adicional cuando se pasa', () => {
    render(<Button className="extra">Comprar</Button>);
    expect(screen.getByRole('button')).toHaveClass('extra');
});

test('no incluye clases vacías cuando no se pasa className ni fullWidth', () => {
    render(<Button>Comprar</Button>);
    const className = screen.getByRole('button').className;
    expect(className.trim()).not.toContain('  '); // sin dobles espacios por strings vacíos
    expect(className).toContain(styles.button);
    expect(className).toContain(styles.primary);
});

describe('variant', () => {
    test('aplica la clase primary por defecto', () => {
        render(<Button>Comprar</Button>);
        expect(screen.getByRole('button')).toHaveClass(styles.primary);
    });

    test('aplica la clase primary cuando se pasa variant={undefined}', () => {
        render(<Button variant={undefined}>Comprar</Button>);
        expect(screen.getByRole('button')).toHaveClass(styles.primary);
    });

    test('aplica la clase primary cuando se pasa variant="primary"', () => {
        render(<Button variant="primary">Comprar</Button>);
        expect(screen.getByRole('button')).toHaveClass(styles.primary);
    });

    test('aplica la clase ghost cuando se pasa variant="ghost"', () => {
        render(<Button variant="ghost">Comprar</Button>);
        expect(screen.getByRole('button')).toHaveClass(styles.ghost);
    });

    test('no aplica la clase ghost cuando variant es primary', () => {
        render(<Button variant="primary">Comprar</Button>);
        expect(screen.getByRole('button')).not.toHaveClass(styles.ghost);
    });
});

describe('fullWidth', () => {
    test('no aplica fullWidth por defecto', () => {
        render(<Button>Comprar</Button>);
        expect(screen.getByRole('button')).not.toHaveClass(styles.fullWidth);
    });

    test('aplica la clase fullWidth cuando fullWidth=true', () => {
        render(<Button fullWidth>Comprar</Button>);
        expect(screen.getByRole('button')).toHaveClass(styles.fullWidth);
    });

    test('no aplica fullWidth cuando fullWidth=false', () => {
        render(<Button fullWidth={false}>Comprar</Button>);
        expect(screen.getByRole('button')).not.toHaveClass(styles.fullWidth);
    });
});
