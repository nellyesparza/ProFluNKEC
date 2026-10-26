import filesData from './flutterFiles.json';

export interface FlutterFile {
  path: string;
  name: string;
  content: string;
  size: number;
}

export const flutterFiles: FlutterFile[] = filesData as FlutterFile[];

export const projectStats = {
  totalFiles: flutterFiles.length,
  totalLines: flutterFiles.reduce((acc, f) => acc + f.content.split('\n').length, 0),
  zipFileName: 'flutter_devcritique_app.zip',
  zipDownloadUrl: '/flutter_devcritique_app.zip',
  version: '1.0.0+1',
  flutterVersion: '>=3.16.0',
};
