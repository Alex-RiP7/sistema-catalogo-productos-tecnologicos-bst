// ======================================================
// Sistema de Catálogo de Productos Tecnológicos
// Árbol Binario de Búsqueda (BST)
// Abstracción • Encapsulamiento • Modularidad
// ======================================================

// ---------- Clase Producto (Abstracción + Encapsulamiento) ----------
class Producto {
    constructor(codigo, nombre, categoria, precio, stock, descripcion = '') {
        this._codigo = codigo.trim().toUpperCase();
        this._nombre = nombre;
        this._categoria = categoria;
        this._precio = parseFloat(precio);
        this._stock = parseInt(stock);
        this._descripcion = descripcion;
    }

    get codigo() { return this._codigo; }
    get nombre() { return this._nombre; }
    get categoria() { return this._categoria; }
    get precio() { return this._precio; }
    get stock() { return this._stock; }
    get descripcion() { return this._descripcion; }

    toString() {
        return `${this._codigo} - ${this._nombre} | ${this._categoria} | $${this._precio} | Stock: ${this._stock}`;
    }
}

// ---------- Nodo del Árbol ----------
class Nodo {
    constructor(producto) {
        this.producto = producto;
        this.izquierda = null;
        this.derecha = null;
    }
}

// ---------- Árbol Binario de Búsqueda ----------
class ArbolBinarioBusqueda {
    constructor() {
        this.raiz = null;
        this._cantidad = 0;
    }

    get cantidad() { return this._cantidad; }

    // Inserción
    insertar(producto) {
        const nuevo = new Nodo(producto);
        if (!this.raiz) {
            this.raiz = nuevo;
            this._cantidad++;
            return true;
        }
        return this._insertarRec(this.raiz, nuevo);
    }

    _insertarRec(actual, nuevo) {
        if (nuevo.producto.codigo === actual.producto.codigo) {
            return false; // Ya existe
        }
        if (nuevo.producto.codigo < actual.producto.codigo) {
            if (!actual.izquierda) {
                actual.izquierda = nuevo;
                this._cantidad++;
                return true;
            }
            return this._insertarRec(actual.izquierda, nuevo);
        } else {
            if (!actual.derecha) {
                actual.derecha = nuevo;
                this._cantidad++;
                return true;
            }
            return this._insertarRec(actual.derecha, nuevo);
        }
    }

    // Búsqueda
    buscar(codigo) {
        return this._buscarRec(this.raiz, codigo.trim().toUpperCase());
    }

    _buscarRec(nodo, codigo) {
        if (!nodo) return null;
        if (codigo === nodo.producto.codigo) return nodo.producto;
        if (codigo < nodo.producto.codigo) return this._buscarRec(nodo.izquierda, codigo);
        return this._buscarRec(nodo.derecha, codigo);
    }

    // Eliminación
    eliminar(codigo) {
        const cod = codigo.trim().toUpperCase();
        const existe = this.buscar(cod);
        if (!existe) return false;
        this.raiz = this._eliminarRec(this.raiz, cod);
        this._cantidad--;
        return true;
    }

    _eliminarRec(nodo, codigo) {
        if (!nodo) return null;

        if (codigo < nodo.producto.codigo) {
            nodo.izquierda = this._eliminarRec(nodo.izquierda, codigo);
        } else if (codigo > nodo.producto.codigo) {
            nodo.derecha = this._eliminarRec(nodo.derecha, codigo);
        } else {
            // Nodo encontrado
            if (!nodo.izquierda) return nodo.derecha;
            if (!nodo.derecha) return nodo.izquierda;

            // Dos hijos: sucesor inorden
            const sucesor = this._minimo(nodo.derecha);
            nodo.producto = sucesor.producto;
            nodo.derecha = this._eliminarRec(nodo.derecha, sucesor.producto.codigo);
        }
        return nodo;
    }

    _minimo(nodo) {
        while (nodo.izquierda) nodo = nodo.izquierda;
        return nodo;
    }

    // Recorridos
    inorden() {
        const res = [];
        this._inorden(this.raiz, res);
        return res;
    }
    _inorden(nodo, res) {
        if (!nodo) return;
        this._inorden(nodo.izquierda, res);
        res.push(nodo.producto);
        this._inorden(nodo.derecha, res);
    }

    preorden() {
        const res = [];
        this._preorden(this.raiz, res);
        return res;
    }
    _preorden(nodo, res) {
        if (!nodo) return;
        res.push(nodo.producto);
        this._preorden(nodo.izquierda, res);
        this._preorden(nodo.derecha, res);
    }

    postorden() {
        const res = [];
        this._postorden(this.raiz, res);
        return res;
    }
    _postorden(nodo, res) {
        if (!nodo) return;
        this._postorden(nodo.izquierda, res);
        this._postorden(nodo.derecha, res);
        res.push(nodo.producto);
    }

    altura() {
        return this._altura(this.raiz);
    }
    _altura(nodo) {
        if (!nodo) return 0;
        return 1 + Math.max(this._altura(nodo.izquierda), this._altura(nodo.derecha));
    }
}

// ---------- Sistema Principal ----------
class SistemaCatalogo {
    constructor() {
        this.arbol = new ArbolBinarioBusqueda();
        this.cargar();
    }

    agregar(producto) {
        return this.arbol.insertar(producto);
    }

    buscar(codigo) {
        return this.arbol.buscar(codigo);
    }

    eliminar(codigo) {
        return this.arbol.eliminar(codigo);
    }

    obtenerInorden() { return this.arbol.inorden(); }
    obtenerPreorden() { return this.arbol.preorden(); }
    obtenerPostorden() { return this.arbol.postorden(); }

    estadisticas() {
        return {
            cantidad: this.arbol.cantidad,
            altura: this.arbol.altura(),
            esVacio: this.arbol.cantidad === 0
        };
    }

    guardar() {
        const productos = this.arbol.inorden();
        localStorage.setItem('catalogoBST', JSON.stringify(productos.map(p => ({
            codigo: p.codigo,
            nombre: p.nombre,
            categoria: p.categoria,
            precio: p.precio,
            stock: p.stock,
            descripcion: p.descripcion
        }))));
    }

    cargar() {
        const data = localStorage.getItem('catalogoBST');
        if (data) {
            const lista = JSON.parse(data);
            lista.forEach(p => {
                this.arbol.insertar(new Producto(p.codigo, p.nombre, p.categoria, p.precio, p.stock, p.descripcion));
            });
        } else {
            this.cargarEjemplos();
        }
    }

    cargarEjemplos() {
        const ejemplos = [
            new Producto('TECH003', 'Laptop Dell XPS 13', 'Laptop', 24999, 5, 'Intel i7, 16GB RAM, 512GB SSD'),
            new Producto('TECH001', 'iPhone 16', 'Smartphone', 21999, 12, '128GB, Titanio'),
            new Producto('TECH005', 'Samsung Galaxy Tab S9', 'Tablet', 14999, 8, '11", 256GB'),
            new Producto('TECH002', 'AirPods Pro 2', 'Audífonos', 4999, 20, 'Cancelación de ruido'),
            new Producto('TECH007', 'Monitor LG 27" 4K', 'Monitor', 8999, 6, 'IPS, 60Hz'),
            new Producto('TECH004', 'Teclado Mecánico Keychron', 'Teclado', 1899, 15, 'Switches Gateron'),
            new Producto('TECH006', 'Mouse Logitech MX Master 3S', 'Mouse', 2199, 10, 'Inalámbrico ergonómico')
        ];
        ejemplos.forEach(p => this.arbol.insertar(p));
        this.guardar();
    }
}

// ---------- UI ----------
const sistema = new SistemaCatalogo();

const form = document.getElementById('formProducto');
const mensaje = document.getElementById('mensaje');
const catalogoDiv = document.getElementById('catalogo');
const inordenDiv = document.getElementById('inorden');
const preordenDiv = document.getElementById('preorden');
const postordenDiv = document.getElementById('postorden');
const statsDiv = document.getElementById('stats');
const resultadoBusqueda = document.getElementById('resultadoBusqueda');

function mostrarMensaje(texto, tipo = 'exito') {
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
    setTimeout(() => mensaje.textContent = '', 3500);
}

function renderProducto(p) {
    return `<div class="producto">
        <strong>${p.codigo}</strong> — ${p.nombre}<br>
        ${p.categoria} • $${p.precio.toLocaleString()} • Stock: ${p.stock}<br>
        <small>${p.descripcion || 'Sin descripción'}</small>
    </div>`;
}

function actualizarVista() {
    const productos = sistema.obtenerInorden();
    catalogoDiv.innerHTML = productos.length
        ? productos.map(renderProducto).join('')
        : '<p style="text-align:center;color:#888;">Catálogo vacío</p>';

    const ino = sistema.obtenerInorden().map(p => p.codigo).join(' → ') || 'Vacío';
    const pre = sistema.obtenerPreorden().map(p => p.codigo).join(' → ') || 'Vacío';
    const post = sistema.obtenerPostorden().map(p => p.codigo).join(' → ') || 'Vacío';

    inordenDiv.textContent = ino;
    preordenDiv.textContent = pre;
    postordenDiv.textContent = post;

    const stats = sistema.estadisticas();
    statsDiv.innerHTML = `
        <div class="stat"><div class="num">${stats.cantidad}</div><div>Productos</div></div>
        <div class="stat"><div class="num">${stats.altura}</div><div>Altura del árbol</div></div>
        <div class="stat"><div class="num">${stats.esVacio ? 'Sí' : 'No'}</div><div>Árbol vacío</div></div>
    `;

    sistema.guardar();
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const codigo = document.getElementById('codigo').value;
    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;
    const descripcion = document.getElementById('descripcion').value;

    const producto = new Producto(codigo, nombre, categoria, precio, stock, descripcion);
    const ok = sistema.agregar(producto);

    if (ok) {
        mostrarMensaje(`Producto ${producto.codigo} insertado correctamente.`, 'exito');
        form.reset();
    } else {
        mostrarMensaje(`El código ${producto.codigo} ya existe en el árbol.`, 'error');
    }
    actualizarVista();
});

document.getElementById('btnBuscar').addEventListener('click', () => {
    const cod = document.getElementById('buscarCodigo').value;
    if (!cod) return;
    const p = sistema.buscar(cod);
    resultadoBusqueda.innerHTML = p
        ? renderProducto(p)
        : '<p style="color:#c62828;">Producto no encontrado</p>';
});

document.getElementById('btnEliminar').addEventListener('click', () => {
    const cod = document.getElementById('buscarCodigo').value;
    if (!cod) return;
    const ok = sistema.eliminar(cod);
    if (ok) {
        mostrarMensaje(`Producto ${cod.toUpperCase()} eliminado.`, 'exito');
        resultadoBusqueda.innerHTML = '';
        document.getElementById('buscarCodigo').value = '';
    } else {
        mostrarMensaje('Producto no encontrado.', 'error');
    }
    actualizarVista();
});

// Inicial
actualizarVista();
