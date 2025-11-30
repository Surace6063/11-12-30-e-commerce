from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):
    # Default number of items per page
    page_size = 10
    # Allow frontend to request custom size: ?page_size=20
    page_size_query_param = 'page_size'
    # Max items a client can request
    max_page_size = 50
    # Optional: rename ?page
    page_query_param = 'page' # ?page=2

    # Customize the response JSON
    def get_paginated_response(self, data):
        return Response({
            'total_items': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        })
