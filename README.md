# Aula Music Player Back-End

This is the back-end of the Aula Music Player. It currently serves 3 endpoints:

## Endpoints

### GET /api/v1/songs

Returns a list of songs with their respective metadata. Filter via querystring using any of these fields:

  1. `title` (finds songs with titles _like_ the parameter)
  2. `artist` (finds songs with artists _like_ the parameter)
  3. `format` (exact match)
  4. `year` (exact match)
  5. `genre` (genre list includes parameter)
  6. `tag` (tag list includes parameter)

    $> curl localhost:8080/api/v1/songs?artist=led%20zeppelin
    $> curl "localhost:8080/api/v1/songs?artist=lef%20zeppelin&title=dazed"
    $> curl "localhost:8080/api/v1/songs?tag=sad&genre=metal"

### GET /api/v1/songs/<song ID>

Returns the metadata for a single song with the specified ID. E.g.

    $> curl localhost:8080/api/v1/songs/12

### GET /api/v1/song-files/<song ID>

Fetches the entire song file with the specified ID. E.g.

    $> curl localhost:8080/api/v1/song-files/12 --output song.mp3

## Setup

Edit `src/config.json` to point `musicDbFilename` at the `aula.json` in the root of this repository. Also update the `musicRoot` path to point to somewhere else on the filesystem, though without files that match the filenames in the `aula.json`, the file download endpoints won't work.

    $> yarn
    $> yarn lint
    $> yarn start

## Recommendations For Future Work

The `repository`, while abstracted behind a sort-of interface, should definitely be converted to read from a database. Reading from a file is cumbersome and can use a lot of memory if the file is large. If the data was in a database of some sort, the repository initialization would have to change, but the controllers could stay the same. Should be more performant too.

Some unit tests couldn't hurt, though I've tried to convert everything to tiny functions composed into more complex behaviour. This way, without the time to build out a full test suite, at least I can reason about the behaviour of 1-line functions.

Error handling couldn't hurt too.

Serving files off the local file system is not ideal. For a final application, I would store a URL for each song in the repository and have the client request the song directly. That way, I can put them in better-performing storage like S3 or Google Cloud Storage. (If we need authentication, then perhaps we can use the existing ID-based routes and proxy the requests on behalf of the authenticated client.)

Containerize. Ideally, this runs as a stateless (and local-filesystem-agnostic) Docker container and points to a database and storage.

Pagination will be required for large query results.
