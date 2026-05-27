# Sabio Pipil Design System

## Identidad

Sabio Pipil debe sentirse moderno, cultural y premium: una trivia clara como juego mobile, con referencias mesoamericanas sutiles en geometria, textura y color. La cultura aparece como lenguaje visual integrado, no como decoracion pesada.

## Paleta

- Verde Jade `#3A7D44`: accion principal, progreso positivo, aciertos.
- Dorado Maiz `#E9B44C`: enfasis, recompensas, energia ludica.
- Cafe Volcanico `#5C3A21`: titulos, estructura, contraste calido.
- Azul Anil `#2A4D69`: categorias, informacion, estados neutros.
- Arena `#F2E8CF`: superficies calidas y bloques secundarios.
- Rojo Artesanal `#B85042`: errores, alertas, contraste puntual.
- Piedra `#8D8D8D`: texto secundario y deshabilitados.

## Tipografia

- Titulos: Marcellus, aplicada con `.font-display`.
- UI: Outfit, importada globalmente para botones, HUD, tarjetas y texto.

## Componentes Base

- `Button`: variantes `primary`, `secondary`, `ghost`, `danger`; rounded-xl, sombra suave, focus ring dorado.
- `Card`: superficie arena clara, borde volcanico sutil, sombra elevada ligera.
- `Badge`: etiquetas compactas para categorias, estados y secciones.
- `ProgressBar`: gradiente Jade -> Maiz -> Rojo para avance visible.
- `Input`: campo reutilizable con focus ring y fondo claro.
- `Modal`: overlay con blur, tarjeta calida y accion de cierre.

## Layout

Mobile first, una sola columna por defecto. En desktop, los paneles de estadisticas y categorias pueden dividirse en dos columnas. El HUD del juego debe priorizar puntaje, racha, categoria y progreso antes de la pregunta.

## Iconografia

Se usan monogramas culturales simples como placeholders escalables:

- `MA`: maiz y gastronomia.
- `VO`: volcan y lugares.
- `PI`: piedra/memoria para historia.
- `NA`: raiz Nahua/Pipil para tradiciones.

La siguiente evolucion natural es reemplazarlos por pictogramas lineales propios con grosor uniforme, esquinas suaves y geometria inspirada en glifos.

## Patrones

`.pipil-pattern` usa triangulos y diagonales de baja opacidad. Debe aparecer en fondos o bordes amplios, nunca compitiendo con preguntas o respuestas. `.paper-texture` agrega una textura minima de papel/piedra para calidez.

## Movimiento

- `animate-rise`: entrada suave para bloques principales.
- `animate-press`: microinteraccion tactil para botones y tarjetas.
- Transiciones entre estados: 160-500ms, suaves y legibles.
