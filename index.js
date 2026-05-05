```javascript
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class PresupuestoPersonal {
  constructor() {
    this.ingresos = [];
    this.gastos = [];
    this.categorias = ['Alimentación', 'Transporte', 'Vivienda', 'Entretenimiento', 'Salud', 'Educación', 'Otros'];
  }

  agregarIngreso(descripcion, monto) {
    if (monto <= 0) {
      console.log('❌ El monto debe ser mayor a 0');
      return false;
    }
    this.ingresos.push({ descripcion, monto, fecha: new Date().toLocaleDateString() });
    console.log(`✅ Ingreso agregado: ${descripcion} - $${monto.toFixed(2)}`);
    return true;
  }

  agregarGasto(descripcion, monto, categoria) {
    if (monto <= 0) {
      console.log('❌ El monto debe ser mayor a 0');
      return false;
    }
    if (!this.categorias.includes(categoria)) {
      console.log(`❌ Categoría no válida. Opciones: ${this.categorias.join(', ')}`);
      return false;
    }
    this.gastos.push({ descripcion, monto, categoria, fecha: new Date().toLocaleDateString() });
    console.log(`✅ Gasto agregado: ${descripcion} - $${monto.toFixed(2)} (${categoria})`);
    return true;
  }

  obtenerTotalIngresos() {
    return this.ingresos.reduce((total, ingreso) => total + ingreso.monto, 0);
  }

  obtenerTotalGastos() {
    return this.gastos.reduce((total, gasto) => total + gasto.monto, 0);
  }

  obtenerSaldo() {
    return this.obtenerTotalIngresos() - this.obtenerTotalGastos();
  }

  obtenerGastosPorCategoria() {
    const gastosPorCat = {};
    this.gastos.forEach(gasto => {
      if (!gastosPorCat[gasto.categoria]) {
        gastosPorCat[gasto.categoria] = 0;
      }
      gastosPorCat[gasto.categoria] += gasto.monto;
    });
    return gastosPorCat;
  }

  mostrarResumenMensual() {
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║    RESUMEN PRESUPUESTO MENSUAL        ║');
    console.log('╚════════════════════════════════════════╝\n');

    const totalIngresos = this.obtenerTotalIngresos();
    const totalGastos = this.obtenerTotalGastos();
    const saldo = this.obtenerSaldo();

    console.log(`📊 INGRESOS TOTALES: $${totalIngresos.toFixed(2)}`);
    if (this.ingresos.length > 0) {
      this.ingresos.forEach(ingreso => {
        console.log(`   • ${ingreso.descripcion}: $${ingreso.monto.toFixed(2)}`);
      });
    } else {
      console.log('   • Sin ingresos registrados');
    }

    console.log(`\n💸 GASTOS TOTALES: $${totalGastos.toFixed(2)}`);
    const gastosPorCat = this.obtenerGastosPorCategoria();
    
    if (Object.keys(gastosPorCat).length > 0) {
      Object.entries(gastosPorCat).forEach(([categoria, monto]) => {
        const porcentaje = ((monto / totalIngresos) * 100).toFixed(1);
        console.log(`   • ${categoria}: $${monto.toFixed(2)} (${porcentaje}%)`);
      });
    } else {
      console.log('   • Sin gastos registrados');
    }

    console.log('\n' + '─'.repeat(40));
    if (saldo >= 0) {
      console.log(`✨ SALDO DISPONIBLE: $${saldo.toFixed(2)}`);
    } else {
      console.log(`⚠️  SALDO NEGATIVO: -$${Math.abs(saldo).toFixed(2)}`);
    }
    console.log('─'.repeat(40) + '\n');
  }

  mostrarDetalleGastos() {
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║       DETALLE DE GASTOS                ║');
    console.log('╚════════════════════════════════════════╝\n');
    
    if (this.gastos.length === 0) {
      console.log('Sin gastos registrados');
      return;
    }

    this.gastos.forEach((gasto, index) => {
      console.log(`${index + 1}. ${gasto.descripcion}`);
      console.log(`   Categoría: ${gasto.categoria}`);
      console.log(`   Monto: $${gasto.monto.toFixed(2)}`);
      console.log(`   Fecha: ${gasto.fecha}\n`);
    });
  }

  limpiarRegistros() {
    this.ingresos = [];
    this.gastos = [];
    console.log('✅ Todos los registros han sido eliminados');
  }
}

function mostrarMenu() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   SIMULADOR