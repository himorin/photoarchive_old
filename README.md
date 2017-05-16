# Simple stored photo/movie listings software

This software is not designed to provide extended management and archiving 
photo and movie files, but just to provide simple display of stored files 
with preprocessed indexes and thumbnails. 

## System design and interface

### Directory organization

* Top directory contains scripts to build indexes and thumbnails
  * ~~pfspaconf.json~~ is required as configuration file, sample is ~~pfspaconf-sample.json~~
  * pymagic is from external repository (submodule), need to be there for processing
* ~~html~~ directory contains static html and javascript files for web view
  * By default, processing of thumbnails are done in ~~html/data~~ directory.
  * ~~html/api~~ is for API interface to push from Web clients.

### External interface

Web interface is mostly one direction, using static json files which are 
pre-created and stored in storage with static html file in this repository.
These json files are categorized into two:

* index of all albums, which is defined as collections of medias with attached 
  information or comments. 
* index of medias to define one album, which is defined as collections of 
  medias, and is contains path to original and thumbnail files, media 
  information (size, length etc.), and comments added by album creater. 

Generation of thumbnails and their index json file is done at server in shell 
but not web interface like file upload etc. User generated 'album' is need to 
be pushed from web interface into the server storage, on that point push API 
will be used with uploading just json contents, and updating index of all 
albums and writting into server storage are done by API.

### Media registration and processing

Media registration and processing to thumbnails need to be done at the server 
in shell but not by web interface. Medias to be registered and processed need 
to be placed into one dedicate directory in original data directory created 
in ~~pfspaconf.json~~, default to ~~data/orig~~. 
Any file in the new directory to be processed is checked using pymagic and 
processed to create thumbnail if one is categorized into MIME category of 
image or video. 

Once a directory is processed, index of medias are written in json format 
and registered into an index of all albums, and will be ready to view on the 
web interface.

## JSON file format

### System configuration (server-side processing) 

### Index of all albums

### Index of medias to define one album

