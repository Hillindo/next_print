'use client';

import EscPosEncoder from 'esc-pos-encoder';

let encoder = new EscPosEncoder();

export default function Home() {
  const goToPrinter = () => {
    let result = encoder
      .initialize()
      .text('The quick brown fox jumps over the lazy dog')
      .newline()
      .qrcode('https://nielsleenheer.com')
      .newline()
      .table(
        [
          { width: 36, marginRight: 2, align: 'left' },
          { width: 10, align: 'right' },
        ],
        [
          ['Item 1', '€ 10,00'],
          ['Item 2', '15,00'],
          ['Item 3', '9,95'],
          ['Item 4', '4,75'],
          ['Item 5', '211,05'],
          ['', '='.repeat(10)],
        ]
      )
      .encode();
      return result;
  };

  const printResult = async () => {
    try {
      const printer = await navigator.usb.requestDevice({ filters: [{ interfaceClass: 7 }] });
      await printer.open();
      await printer.claimInterface(0);
      await printer.transferOut(1, goToPrinter());
      alert('printed')
      console.log("data", goToPrinter());
    } catch (error) {
      console.error("Error printing:", error.message);
    }
  }

  return (
    <main>
      <button onClick={printResult}>Go to printer</button>
    </main>
  );
}
