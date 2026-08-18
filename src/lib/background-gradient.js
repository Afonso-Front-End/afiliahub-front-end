export function gradientBackgroundStyle(bg) {
    if (!bg.from || !bg.to)
        return {};
    return {
        background: `linear-gradient(${bg.angle ?? 135}deg, ${bg.from}, ${bg.to})`,
    };
}
