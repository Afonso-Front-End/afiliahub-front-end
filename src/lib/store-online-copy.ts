export function storeOnlineCopy(goingOnline: boolean) {
  if (goingOnline) {
    return {
      title: "Colocar loja online",
      description:
        "Visitantes passam a ver o site publicamente. Confirme com a sua senha de administrador.",
    };
  }

  return {
    title: "Colocar loja offline",
    description:
      "Visitantes verão uma página de manutenção. O admin continua a poder editar. Confirme com a sua senha.",
  };
}

export function storeOnlineSuccessMessage(online: boolean) {
  return online
    ? "Loja online. O site está visível para visitantes."
    : "Loja offline. Visitantes veem a página de manutenção.";
}

export function storeOnlineStatusLabel(online: boolean) {
  return online ? "online (visível ao público)" : "offline (em manutenção)";
}
