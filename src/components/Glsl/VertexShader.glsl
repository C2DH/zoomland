
varying vec2 vUv; //send UV to Fragment material

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv; // convert to uv
}