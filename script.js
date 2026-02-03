function anggotaApp() {
  return {
    search: "",
    sortKey: "nama",
    sortAsc: true,
    page: 1,
    perPage: 5,

    data: [
      {
        nama: "Andi Saputra",
        nta: "001",
        angkatan: "2023",
        status: "Aktif",
      },
      {
        nama: "Budi Santoso",
        nta: "002",
        angkatan: "2022",
        status: "Alumni",
      },
      {
        nama: "Citra Lestari",
        nta: "003",
        angkatan: "2023",
        status: "Aktif",
      },
      {
        nama: "Deni Pratama",
        nta: "004",
        angkatan: "2021",
        status: "Alumni",
      },
      {
        nama: "Eka Putri",
        nta: "005",
        angkatan: "2024",
        status: "Aktif",
      },
      {
        nama: "Fajar Nugraha",
        nta: "006",
        angkatan: "2022",
        status: "Aktif",
      },
    ],

    sortBy(key) {
      this.sortKey === key
        ? (this.sortAsc = !this.sortAsc)
        : ((this.sortKey = key), (this.sortAsc = true));
    },

    filteredData() {
      return this.data
        .filter((i) => i.nama.toLowerCase().includes(this.search.toLowerCase()))
        .sort((a, b) => {
          let r = a[this.sortKey] > b[this.sortKey] ? 1 : -1;
          return this.sortAsc ? r : -r;
        });
    },

    paginatedData() {
      const start = (this.page - 1) * this.perPage;
      return this.filteredData().slice(start, start + this.perPage);
    },

    totalPages() {
      return Math.ceil(this.filteredData().length / this.perPage);
    },

    exportPDF() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.setFontSize(14);
      doc.text("Data Anggota Dewan Ambalan", 14, 15);

      doc.autoTable({
        startY: 20,
        head: [["Nama", "NTA", "Angkatan", "Status"]],
        body: this.filteredData().map((a) => [
          a.nama,
          a.nta,
          a.angkatan,
          a.status,
        ]),
      });

      doc.save("data-anggota-ambalan.pdf");
    },
  };
}
