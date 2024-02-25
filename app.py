"""
The entry for the TechUp program.
"""

from techup import create_app

techup = create_app()

if __name__ == '__main__':
    techup.run(debug=True)
