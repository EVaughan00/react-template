import converter from "json-2-csv";


export function downloadCSV(name: string, object: any, options?: converter.IFullOptions) {
    converter.json2csv(
        object,
        (err, csv) => {
          if (err) {
            throw err;
          }
  
          const element = document.createElement("a");
          const file = new Blob([csv ?? ""], { type: "application/text" });
          element.href = URL.createObjectURL(file);
          element.download = `${name}.csv`;
          document.body.appendChild(element); // Required for this to work in FireFox
          element.click();
        },
        options
      );
}