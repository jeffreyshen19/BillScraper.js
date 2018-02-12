# Bill Template
Every element stored in the database will be a JSON object of the following template:

```
{
  "_id": ObjectId,
  "tags": Array,
  "congress": Int32,
  "session": Int32,
  "type": String,
  "url": String,
  "text": String,
  "title": string,
  "chamber": String,
  "number": String,
  "numberInt": Int32
}
```

* `_id`: Unique identifying number for a bill
* `tags`: An array of tags
* `congress`: Which congress this bill was passed in. This can be 113, 114, or 115
* `session`: Which session of congress was this bill passed in. This can be 1 or 2
* `type`: What type of bill is this. See VALID_BILL_TYPES.md for more information
* `url`: Path to the original XML bill file
* `text`: Parsed bill text
* `title`: Official bill title
* `chamber`: What chamber the bill was passed in.
* `number`: String version of the bill number (i.e. H. R. 1107)
* `numberInt`: Number version of the bill number (i.e. 1107)
