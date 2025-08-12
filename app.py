from flask import Flask, render_template, request, flash, redirect, url_for
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, EmailField
from wtforms.validators import DataRequired, Email, Length
import os

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-this-in-production'

# Contact form class
class ContactForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=2, max=50)])
    email = EmailField('Email', validators=[DataRequired(), Email()])
    subject = StringField('Subject', validators=[DataRequired(), Length(min=5, max=100)])
    message = TextAreaField('Message', validators=[DataRequired(), Length(min=10, max=500)])
    submit = SubmitField('Send Message')

# Sample project data
projects = [
    {
        'id': 1,
        'title': 'E-Commerce Website',
        'description': 'A full-stack e-commerce platform built with Python Django and React',
        'technologies': ['Python', 'Django', 'React', 'PostgreSQL', 'CSS3'],
        'image': 'project1.jpg',
        'github': 'https://github.com/yourusername/ecommerce',
        'demo': 'https://yourproject1.com'
    },
    {
        'id': 2,
        'title': 'Task Management App',
        'description': 'A responsive task management application with real-time updates',
        'technologies': ['Flask', 'JavaScript', 'Bootstrap', 'SQLite'],
        'image': 'project2.jpg',
        'github': 'https://github.com/yourusername/taskmanager',
        'demo': 'https://yourproject2.com'
    },
    {
        'id': 3,
        'title': 'Data Visualization Dashboard',
        'description': 'Interactive dashboard for data analysis and visualization',
        'technologies': ['Python', 'Plotly', 'Pandas', 'Streamlit'],
        'image': 'project3.jpg',
        'github': 'https://github.com/yourusername/dataviz',
        'demo': 'https://yourproject3.com'
    }
]

# Sample skills data
skills = {
    'programming': ['C', 'Python', 'Java', 'SQL', 'HTML', 'CSS'],
    'frameworks': ['Django', 'JavaFX', 'Pandas', 'NumPy', 'Matplotlib'],
    'tools': ['Git', 'GitHub', 'ServiceNow', 'MySQL'],
    'other': ['OOP', 'Data Structures', 'REST APIs', 'Authentication']
}

@app.route('/')
def index():
    """Home page with hero section and overview"""
    return render_template('index.html', skills=skills)

@app.route('/about')
def about():
    """About page with detailed information"""
    return render_template('about.html', skills=skills)

@app.route('/projects')
def projects_page():
    """Projects showcase page"""
    return render_template('projects.html', projects=projects)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Contact page with form handling"""
    form = ContactForm()
    
    if form.validate_on_submit():
        # In a real application, you would send email or save to database
        # For demo purposes, we'll just flash a success message
        flash(f'Thank you {form.name.data}! Your message has been received. I\'ll get back to you soon!', 'success')
        
        # Here you could add email sending functionality
        # send_email(form.email.data, form.subject.data, form.message.data)
        
        # Clear form after successful submission
        return redirect(url_for('contact'))
    
    return render_template('contact.html', form=form)

@app.errorhandler(404)
def not_found_error(error):
    """Custom 404 error handler"""
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    """Custom 500 error handler"""
    return render_template('500.html'), 500

# Template filters for custom formatting
@app.template_filter('capitalize_words')
def capitalize_words(text):
    """Capitalize each word in a string"""
    return ' '.join(word.capitalize() for word in text.split())

if __name__ == '__main__':
    # Create static directories if they don't exist
    os.makedirs('static/images', exist_ok=True)
    os.makedirs('static/css', exist_ok=True)
    os.makedirs('static/js', exist_ok=True)
    
    # Run the application
    app.run(debug=True, host='127.0.0.1', port=5000)