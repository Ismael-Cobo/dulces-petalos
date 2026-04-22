import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Input } from './Input';
import styles from './input.module.css';

test('renderiza un input', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('acepta placeholder', () => {
    render(<Input placeholder="Buscar productos..." />);
    expect(screen.getByPlaceholderText('Buscar productos...')).toBeInTheDocument();
});

test('acepta y muestra el valor ingresado por el usuario', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Input onChange={onChange} />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'rosas');

    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue('rosas');
});

test('renderiza prefixIcon cuando se pasa', () => {
    render(<Input prefixIcon={<span data-testid="icon">🔍</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
});

test('no renderiza prefixIcon cuando no se pasa', () => {
    render(<Input />);
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
});

test('pasa atributos nativos al input', () => {
    render(<Input type="search" aria-label="Buscar" disabled />);
    const input = screen.getByRole('searchbox');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-label', 'Buscar');
});

describe('clases CSS', () => {
    test('aplica la clase wrapper al contenedor', () => {
        const { container } = render(<Input />);
        expect(container.firstChild).toHaveClass(styles.wrapper);
    });

    test('aplica la clase input al elemento input', () => {
        render(<Input />);
        expect(screen.getByRole('textbox')).toHaveClass(styles.input);
    });

    test('aplica la clase prefixIcon al span cuando se pasa prefixIcon', () => {
        const { container } = render(<Input prefixIcon={<span>🔍</span>} />);
        const prefixSpan = container.querySelector(`.${styles.prefixIcon}`);
        expect(prefixSpan).toBeInTheDocument();
    });
});
