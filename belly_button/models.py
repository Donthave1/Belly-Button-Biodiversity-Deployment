from .app import db

class Belly_Button(db.Model):
    __tablename__ = "belly_button"

    otu_ids = db.Column(db.Integer, primary_key=True)
    otu_labels = db.Column(db.String)
    sample_values = db.Column(db.Integer)

    def __repr__(self):
        return f"<Sample {self.otu_labels}>"