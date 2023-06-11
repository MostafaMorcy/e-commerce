export class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.queryString = queryString;
    this.mongooseQuery = mongooseQuery;
  }
  paginate() {
    // pagination
    let page = this.queryString.page * 1 || 1;
    if (this.queryString.page <= 0) page = 1;
    let skip = (page - 1) * 5;
    this.page = page;
    this.mongooseQuery.skip(skip).limit(5);
    return this;
  }
  filter() {
    /// filter
    let filterObj = { ...this.queryString }; // deep copy cause words page ,sort don't found
    let excludedQuery = ["page", "sort", "keyword", "fields"];
    excludedQuery.forEach((q) => {
      delete filterObj[q];
    });
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    filterObj = JSON.parse(filterObj);
    console.log(filterObj);
    this.mongooseQuery.find(filterObj);
    return this;
  }
  sort() {
    // sort
    if (this.queryString.sort) {
      let sortedBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortedBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createAt");
    }
    return this;
  }
  search() {
    // search
    if (this.queryString.keyword) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
          { name: { $regex: this.queryString.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }
  field() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }
}
