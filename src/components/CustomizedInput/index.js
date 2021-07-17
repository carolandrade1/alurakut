function CustomizedInput(propriedades) {

    return (
        <input
            placeholder={propriedades.placeholder}
            name={propriedades.name}
            aria-label={propriedades.ariaLabel}
            type="text"
            value={propriedades.value}
            onChange={e => propriedades.onValueChange(e.target.value)}
            required
        />
    );
}

export default CustomizedInput;