
export interface FileResourceOpts extends FilePropertyBag {
    location: string
}

export interface FileResource extends File { 
    location?: string;
}

export function convertResource(resource: FileResource): FileResource | undefined {
    if (!resource)
        return;    

    if (resource.constructor &&
        resource.constructor.name == 'File')             
        return resource;    

    let file: any;

    // if (!navigator.msSaveBlob) {
    //     file = new File([""], resource.name, {
    //         type: resource.type,
    //         lastModified: resource.lastModified,
    //     });
    // } else {
    //     file = new Blob([""], { type: resource.type });
    //     file = blobToFile(file, resource.name);
    // }

    file.location = resource.location;

    return file;
}

export function blobToFile(theBlob: Blob, fileName: string): File {
    const b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return b as File;
 }

export function createResource(name: any, location: any) {
    let file: any = new File([""], name, {
        type: 'text/plain',
    });
    file.location = location;

    return file;
}

export function saveFile(file: any, fileName: string) {
    let uri = "data:application/octet-stream," + encodeURIComponent(file);

    let el = document.createElement('a');
    el.setAttribute('href', uri);
    el.setAttribute('download', fileName);

    if (document.createEvent) {
        let event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        el.dispatchEvent(event);
        return;
    } else {
        el.click();
    }

    document.removeChild(el);
}